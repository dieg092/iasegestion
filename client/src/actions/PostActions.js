import axios from 'axios';
import { FETCH_POSTS, POST_CREATED, POST_CLICKED, POST_DELETED,
  CATEGORY_CLICKED, POST_OTHERS } from './types';
import M from "materialize-css/dist/js/materialize.min.js";

export const fetchPosts = (page, filters) => async dispatch => {
  const filter = filterPosts(filters);

  const res = await axios.get('/api/posts?page=' + page + '&filter=' + filter);
  dispatch({ type: FETCH_POSTS, payload: res.data });
};

export const getPost = (history) => async dispatch => {
  const post = history.location.pathname.split('/')[2];

  const res = await axios.get('/api/post/' + post);

  dispatch({ type: POST_CLICKED, payload: res.data[0] });
};

export const otherPosts = (history) => async dispatch => {
  const post = history.location.pathname.split('/')[2];

  const res = await axios.get('/api/post/others/' + post);

  dispatch({ type: POST_OTHERS, payload: res.data });
};

export const postData = (post) => {
  return {
    type: POST_CLICKED,
    payload: post.data[0]
  };
};

export const deletePost = (post, history) => async dispatch => {
  let message = 'Error al eliminar el post';
  const images = post.body.split('https://s3.eu-west-3.amazonaws.com/iase-test/');
  images.map( async (img, index) => {
    if (index !== 0) {
      const key = img.split('" alt')[0];
      const deleteImage = await axios.delete('/api/delete?key=' + key.split('" alt')[0]);
    }
  })
  const deleteMainImage = await axios.delete('/api/delete?key=' + post.mainPhoto);

  if (deleteMainImage.statusText === 'OK') {
    const res = await axios.delete('/api/post/' + post._id);

    if (res.statusText !== 'ERROR') {
      message = 'Servicio eliminado';
      history.push('/admin/posts');
      dispatch({
        type: POST_DELETED
      });
    }
  }

   window.M.toast({html: message, classes: 'rounded'});
}

export const postClicked = (post, history) => async dispatch => {
  history.push('/admin/posts/' + post.slug);

  return {
    type: POST_CLICKED,
    payload: null
  };
};

export const submitPost = (values, file, mainPhoto, editor, history, edit, postSelected) => async dispatch => {
  let message = 'Error al guardar';
  let uploadConfig = '';
  let res = '';

  if (file) {
    uploadConfig = await axios.get('/api/upload?folder=posts');

    const upload = await axios.put(uploadConfig.data.url, file, {
      headers: {
        'Content-Type': file.type
      }
    });
  }

  const imagesBodySelected = postSelected && postSelected.body.split('https://s3.eu-west-3.amazonaws.com/iase-test/');
  const imagesBody = editor && editor.split('https://s3.eu-west-3.amazonaws.com/iase-test/');

  imagesBodySelected && imagesBodySelected.map( async (img, index) => {
    if (index !== 0) {
      let repeated = false;
      const keySelected = img.split('" alt')[0];
      imagesBody && imagesBody.map( async (imge, index) => {
        if (index !== 0) {
          const keyBody = imge.split('" alt')[0];
          if (keyBody === keySelected) {
            repeated = true;
          }
        }
      });
      if (!repeated) {
        const deleteImage = await axios.delete('/api/delete?key=' + keySelected.split('" alt')[0]);
      }
    }
  });

  if (postSelected && file && postSelected.mainPhoto.split('/')[1] !== file.name) {
    const deleteMainImage = await axios.delete('/api/delete?key=' + postSelected.mainPhoto);
  }


  const allValues = {
    title: values.postTitle,
    category: values.category ? values.category : false,
    mainPhoto: uploadConfig.data && uploadConfig.data.key ? uploadConfig.data.key : '',
    editor: editor
  }

  if (edit) {
    res = await axios.post('/api/post/' + history.location.pathname.split('/')[3], allValues);
  } else {
    res = await axios.post('/api/post', allValues);
  }

  if (res.statusText !== 'ERROR') {
    if (edit) {
      message = 'Post editado';
    } else {
      message = 'Post creado';
    }

    history.push('/admin/posts');
  }

  window.M.toast({html: message, classes: 'rounded'})

  dispatch({
    type: POST_CREATED
  });
}

export const filterPosts = (filters) => {
  let filter = "";
  if (filters && filters.postTitle) {
    filter = filter + '&title=' + filters.postTitle;
  }
  if (filters && filters.category) {
    filter = filter + '&category=' + filters.category;
  }

  return filter;
};

export const categoryClicked = (category) => {
  return {
    type: CATEGORY_CLICKED,
    payload: category
  };
}
