import React from 'react';
import PropTypes from 'prop-types';
import { gettext } from '../../utils/constants';
import { IconButton, ButtonGroup, CollabUsersButton } from '@seafile/seafile-editor/dist/components/topbarcomponent/editorToolBar';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Tooltip } from 'reactstrap';
import FileInfo from '@seafile/seafile-editor/dist/components/topbarcomponent/file-info';

const propTypes = {
  isDocs: PropTypes.bool.isRequired,
  hasDraft: PropTypes.bool.isRequired,
  isDraft: PropTypes.bool.isRequired,
  editorUtilities: PropTypes.object.isRequired,
  collabUsers: PropTypes.array.isRequired,
  fileInfo: PropTypes.object.isRequired,
  toggleShareLinkDialog: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  toggleNewDraft: PropTypes.func.isRequired,
  toggleStar: PropTypes.func.isRequired,
  backToParentDirectory: PropTypes.func.isRequired,
  openDialogs: PropTypes.func.isRequired,
  showFileHistory: PropTypes.bool.isRequired,
  toggleHistory: PropTypes.func.isRequired,
  editorMode: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  contentChanged: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  showDraftSaved: PropTypes.bool.isRequired,
};

const MoreMenuPropTypes = {
  readOnly: PropTypes.bool.isRequired,
  openDialogs: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  editorMode: PropTypes.string.isRequired
};

class MoreMenu extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: false,
      dropdownOpen:false
    };
  }

  tooltipToggle = () => {
    this.setState({ tooltipOpen: !this.state.tooltipOpen });
  }

  dropdownToggle = () => {
    this.setState({ dropdownOpen:!this.state.dropdownOpen });
  }

  render() {
    const editorMode = this.props.editorMode;
    const isSmall = this.props.isSmallScreen;
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.dropdownToggle} direction="down" className="mx-1">
        <DropdownToggle id="moreButton">
          <i className="fa fa-ellipsis-v"/>
          <Tooltip toggle={this.tooltipToggle} delay={{show: 0, hide: 0}} target="moreButton" placement='bottom' isOpen={this.state.tooltipOpen}>{gettext('More')}
          </Tooltip>
        </DropdownToggle>
        <DropdownMenu className="drop-list" right={true}>
          {(!this.props.readOnly && editorMode === 'rich') &&
            <DropdownItem onMouseDown={this.props.onEdit.bind(this, 'plain')}>{gettext('Switch to plain text editor')}</DropdownItem>}
          {(!this.props.readOnly && editorMode === 'plain') &&
            <DropdownItem onMouseDown={this.props.onEdit.bind(this, 'rich')}>{gettext('Switch to rich text editor')}</DropdownItem>}
          {(this.props.openDialogs && editorMode === 'rich') &&
            <DropdownItem onMouseDown={this.props.openDialogs.bind(this, 'help')}>{gettext('Help')}</DropdownItem>
          }
          {isSmall && <DropdownItem onMouseDown={this.props.toggleShareLinkDialog}>{gettext('Share')}</DropdownItem>}
          {isSmall && <DropdownItem onMouseDown={this.props.backToParentDirectory}>{gettext('Back to parent directory')}</DropdownItem>}
          {(isSmall && this.props.showFileHistory) &&
            <DropdownItem onMouseDown={this.props.toggleHistory}>{gettext('File History')}</DropdownItem>
          }
        </DropdownMenu>
      </Dropdown>
    );
  }
}

MoreMenu.propTypes = MoreMenuPropTypes;


class MarkdownViewerToolbar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let { contentChanged, saving } = this.props;
    let canPublishDraft = this.props.fileInfo.permission == 'rw';
    let canCreateDraft = canPublishDraft && (!this.props.hasDraft && !this.props.isDraft && this.props.isDocs);

    if (this.props.editorMode === 'rich') {
      return (
        <div className="sf-md-viewer-topbar">
          <div className="sf-md-viewer-topbar-first d-flex justify-content-between">
            <FileInfo
              toggleStar={this.props.toggleStar}
              editorUtilities={this.props.editorUtilities}
              fileInfo={this.props.fileInfo}
              showDraftSaved={this.props.showDraftSaved}
            />
            {(this.props.hasDraft && !this.props.isDraft) &&
              <div className='seafile-btn-view-review'>
                <div className='tag tag-green'>{gettext('This file is in draft stage.')}
                  <a className="ml-2" onMouseDown={this.props.editorUtilities.goDraftPage}>{gettext('View Draft')}</a></div>
              </div>
            }
            <div className="topbar-btn-container">
              {canCreateDraft &&
                <button onMouseDown={this.props.toggleNewDraft} className="btn btn-success btn-new-draft">
                  {gettext('New Draft')}</button>
              }
              {this.props.isDraft &&
                <div>
                  <button type="button" className="btn btn-success seafile-btn-add-review"
                    onMouseDown={this.props.editorUtilities.goDraftPage}>{gettext('Start review')}</button>
                  {canPublishDraft &&
                    <button type="button" className="btn btn-success seafile-btn-add-review"
                      onMouseDown={this.props.editorUtilities.publishDraftFile}>{gettext('Publish')}</button>
                  }
                </div>
              }
              {this.props.collabUsers.length > 0 && <CollabUsersButton className={'collab-users-dropdown'}
                users={this.props.collabUsers} id={'usersButton'} />}
              <ButtonGroup>
                <IconButton id={'shareBtn'} text={gettext('Share')} icon={'fa fa-share-alt'}
                  onMouseDown={this.props.toggleShareLinkDialog}/>
                <IconButton text={gettext('Back to parent directory')} id={'parentDirectory'}
                  icon={'fa fa-folder-open'} onMouseDown={this.props.backToParentDirectory}/>
                {
                  this.props.showFileHistory && <IconButton id={'historyButton'}
                    text={gettext('File History')} onMouseDown={this.props.toggleHistory} icon={'fa fa-history'}/>
                }
                { saving ?
                  <button type={'button'} className={'btn btn-icon btn-secondary btn-active'}>
                    <i className={'fa fa-spin fa-spinner'}/></button>
                  :
                  <IconButton text={gettext('Save')} id={'saveButton'} icon={'fa fa-save'}  disabled={!contentChanged} 
                    onMouseDown={window.seafileEditor && window.seafileEditor.onRichEditorSave} isActive={contentChanged}/>
                }
              </ButtonGroup>
              <MoreMenu
                readOnly={this.props.readOnly}
                openDialogs={this.props.openDialogs}
                editorMode={this.props.editorMode}
                onEdit={this.props.onEdit}
                isSmallScreen={false}
              />
            </div>
          </div>
          <div className="sf-md-viewer-topbar-first-narrow d-flex justify-content-between">
            <FileInfo
              toggleStar={this.props.toggleStar}
              editorUtilities={this.props.editorUtilities}
              fileInfo={this.props.fileInfo}
              showDraftSaved={this.props.showDraftSaved}
            />
            <div className="topbar-btn-container">
              <ButtonGroup>
                {saving ?
                  <button type={'button'} className={'btn btn-icon btn-secondary btn-active'}>
                    <i className={'fa fa-spin fa-spinner'}/></button>
                  :
                  <IconButton text={gettext('Save')} id={'saveButton'} icon={'fa fa-save'}  disabled={!contentChanged} 
                    onMouseDown={window.seafileEditor && window.seafileEditor.onRichEditorSave} isActive={contentChanged}/>
                }
              </ButtonGroup>
              <MoreMenu
                readOnly={this.props.readOnly}
                openDialogs={this.props.openDialogs}
                editorMode={this.props.editorMode}
                onEdit={this.props.onEdit}
                toggleShareLinkDialog={this.props.toggleShareLinkDialog}
                backToParentDirectory={this.props.backToParentDirectory}
                showFileHistory={this.props.showFileHistory}
                toggleHistory={this.props.toggleHistory}
                isSmallScreen={true}
              />
            </div>
          </div>
        </div>
      );
    } else if (this.props.editorMode === 'plain') {
      return (
        <div className="sf-md-viewer-topbar">
          <div className="sf-md-viewer-topbar-first d-flex justify-content-between">
            <FileInfo toggleStar={this.props.toggleStar} editorUtilities={this.props.editorUtilities}
              fileInfo={this.props.fileInfo}/>
            <div className="topbar-btn-container">
              {this.props.collabUsers.length > 0 && <CollabUsersButton className={'collab-users-dropdown'}
                users={this.props.collabUsers} id={'usersButton'} />}
              <ButtonGroup>
                { saving ?
                  <button type={'button'} className={'btn btn-icon btn-secondary btn-active'}>
                    <i className={'fa fa-spin fa-spinner'}/></button>
                  :
                  <IconButton id={'saveButton'} text={gettext('Save')} icon={'fa fa-save'} onMouseDown={window.seafileEditor && window.seafileEditor.onPlainEditorSave} disabled={!contentChanged} isActive={contentChanged} />
                }
              </ButtonGroup>
              <MoreMenu
                readOnly={this.props.readOnly}
                openDialogs={this.props.openDialogs}
                editorMode={this.props.editorMode}
                onEdit={this.props.onEdit}
                isSmallScreen={false}
              />
            </div>
          </div>
          <div className="sf-md-viewer-topbar-first-narrow d-flex justify-content-between">
            <FileInfo toggleStar={this.props.toggleStar} editorUtilities={this.props.editorUtilities}
              fileInfo={this.props.fileInfo}/>
            <div className="topbar-btn-container">
              <ButtonGroup>
                {saving ?
                  <button type={'button'} className={'btn btn-icon btn-secondary btn-active'}>
                    <i className={'fa fa-spin fa-spinner'}/></button>
                  :
                  <IconButton
                    id={'saveButton'}
                    text={gettext('Save')}
                    icon={'fa fa-save'}
                    onMouseDown={window.seafileEditor && window.seafileEditor.onPlainEditorSave}
                    disabled={!contentChanged}
                    isActive={contentChanged}
                  />
                }
              </ButtonGroup>
              <MoreMenu
                readOnly={this.props.readOnly}
                openDialogs={this.props.openDialogs}
                editorMode={this.props.editorMode}
                onEdit={this.props.onEdit}
                isSmallScreen={false}
              />
            </div>
          </div>

        </div>
      );
    }
  }
}

MarkdownViewerToolbar.propTypes = propTypes;

export default MarkdownViewerToolbar;
