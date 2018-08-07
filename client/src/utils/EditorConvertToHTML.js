import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import axios from 'axios';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import request from 'request';

function uploadImageCallBack(file) {
  return new Promise(
    async (resolve, reject) => {
      const uploadConfig = await axios.get('/api/upload');
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

export class EditorConvertToHTML extends Component {
  constructor(props) {
    super(props);
    const html = '';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
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
          id="editor"
          disabled
          style={{ display: 'none' }}
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    );
  }
}

//https://api.imgur.com/3/image
