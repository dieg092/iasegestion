import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import axios from 'axios';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

function uploadImageCallBack(file) {
  return new Promise(
    async (resolve, reject) => {
      const uploadConfig = await axios.get('/api/upload?folder=services');

      const upload = await axios.put(uploadConfig.data.url, file, {
        headers: {
          'Content-Type': file.type
        }
      });

      if (upload.status === 200) {
         resolve({ data: { link: 'https://s3.eu-west-3.amazonaws.com/iase-test/' + uploadConfig.data.key  } });
      } else {
         reject('Error');
      }
  })
}

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

export class EditorConvertToHTML extends Component {
  constructor(props) {
    super(props);
    const html = this.props.value ? this.props.value : '';
    const contentBlock = htmlToDraft(html);
    const contentState = convertFromRaw(content);
    if (contentState) {
      const contentStates = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentStates);
      this.state = {
        editorState,
        edited: false
      };
    }
  }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
      edited: true
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true }, previewImage: true },
          }}
        />
        <textarea
          className="hide"
          id="editor"
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    );
  }
}

//https://api.imgur.com/3/image
