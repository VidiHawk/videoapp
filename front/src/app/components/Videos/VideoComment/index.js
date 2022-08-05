import React, { useState, useEffect, useCallback, createRef } from 'react'
import { connect } from 'react-redux';
import { InputComment } from './InputComment'
import CommentItem from './CommentItem'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import AuthContext from './../../../helpers/authContext'
import IconMessageLight from './../../../../../public/images/icon_message_light.svg';
import { getList, postComment, deleteComment } from './../../../data/ducks/comment/actions';
import { CommentBG } from './../../Common/Preact';
const initialState = {
  comments: [],
  total: 0,
}

const VideoComment = (props) => {
  const context = React.useContext(AuthContext)
  const { videoId } = props
  const [allComments, setAllComments] = useState([])
  const [totalComments, setTotalComments] = useState(0)
  const [loading, setLoading] = useState(true);
  const history = props.history

  const getComments = (params) =>{
    setLoading(true);
    props.getList(params).then(response=>{
      setLoading(false);
      if(response && response[0] && response[0].result && response[0].result.list){
        setTotalComments(response[0].result.meta.total);
        setAllComments(params.offset > 0 ? response[0].result.list.concat(allComments) : response[0].result.list);
      }
    });
  }

  useEffect(() => {
    getComments({videoId, limit:5, offset:0})
  }, [videoId])

  const loadMore = () => {
    getComments({
      offset: values.comments.length,
      limit:5,
      videoId
    })
  }

  const onSend = (comment) => {
    if (context.authenticated) {
      props.postComment({videoId, comment}).then(data => {
        getComments({videoId, limit:5, offset:0})
      })
    } 
    else {
      context.showToastMessage({message:'You need to login first!', type:'error'});
    }
  }

  const onClickUser = (userId) => {
    //REDIRECT USER TO HIS/HER PROFILE
  }

  if(loading) return <CommentBG/>

  return (
    <div className="video-comment-wrapper">
      {totalComments > 0 ? (
        <div className="total-count-wrapper">
          <span className="total-count">
            <IconMessageLight />
            <span>{totalComments < 1000 ? totalComments : `${Math.floor(totalComments / 1000)}K+`}</span>
          </span>
        </div>
      ) : (
        ''
      )}
      <div className="infinite-scroll-wrapper video-comment-list">
        {allComments.map((comment, index) => {
          return (
            <CommentItem
              key={index}
              commentId={comment.id}
              userId={comment.user.user_id}
              commentText={comment.comment}
              userName={comment.user.first_name + ' ' + (comment.user.last_name ? comment.user.last_name.charAt(0) + '.' : '')}
              avatar={comment.user.avatar}
              isThumbsUp={comment.liked}
              isThumbsDown={comment.disliked}
              thumbsUp={comment.likes}
              thumbsDown={comment.dislikes}
              onClickUser={onClickUser}
            />
          )
        })}
      </div>
      <InputComment {...props} onSend={onSend} />
    </div>
  )
}

const mapStateToProps = (state) => ({
	comment: state.comment
});

const mapDispatchToProps = {
  getList, 
  postComment, 
  deleteComment
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoComment);