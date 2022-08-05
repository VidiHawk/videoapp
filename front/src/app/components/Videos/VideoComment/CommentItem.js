import React, {useEffect, useState, useContext} from 'react'
import { connect } from 'react-redux';
import { Avatar, Comment, Tooltip } from 'antd'
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons'
import { likeComment, dislikeComment } from './../../../data/ducks/comment/actions';
import AuthContext from './../../../helpers/authContext'

const initialState = {
  color: 'white',
  likeIcon: `images/icon_thumbsup_outline_light.svg`,
  likeIconSelected: `images/icon_thumbsup_filled_light.svg`,
}

const CommentItem = (props) => {
  const context = useContext(AuthContext)
  const {
    commentId,
    userId,
    commentText = '',
    userName = '',
    avatar,
    theme = 'dark',
    onClickUser,
  } = props

  const [isThumbsUp, setIsThumbsUp] = useState(props.isThumbsUp)
  const [isThumbsDown, setIsThumbsDown] = useState(props.isThumbsDown)
  const [thumbsUp, setThumbsUp] = useState(props.thumbsUp ? props.thumbsUp : 0)
  const [thumbsDown, setThumbsDown] = useState(props.thumbsDown ? props.thumbsDown : 0)
  const [values, setValues] = useState(initialState)

  useEffect(() => {
    setValues((values) => ({
      ...values,
      color: theme === 'dark' ? 'white' : 'black',
      likeIcon: `images/icon_thumbsup_outline_${theme === 'dark' ? 'light' : 'dark'}.svg`,
      likeIconSelected: `images/icon_thumbsup_filled_${theme === 'dark' ? 'light' : 'dark'}.svg`,
    }))
  }, [theme])



  const onClickThumbsUp = (commentId) => {
    if(!isThumbsUp){
      if (context.authenticated) {
        props.likeComment(commentId).then(({ data }) => {
          setThumbsUp(Number(thumbsUp)+1);
          setIsThumbsUp(true);
          if(isThumbsDown){
            setThumbsDown(Number(thumbsDown)-1);
            setIsThumbsDown(false);
          }
        })
      } 
      else {
        context.showToastMessage({message:'You need to login first!', type:'error'});
      }
    }
  }

  const onClickThumbsDown = (commentId) => {
    if(!isThumbsDown){
      if (context.authenticated) {
        props.dislikeComment(commentId).then(({ data }) => {
          setThumbsDown(Number(thumbsDown)+1);
          setIsThumbsDown(true);
          if(isThumbsUp){
            setThumbsUp(Number(thumbsUp)-1);
            setIsThumbsUp(false);
          }
        })
      } 
      else {
        context.showToastMessage({message:'You need to login first!', type:'error'});
      }
    }
  }

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span
        onClick={() => onClickThumbsUp(commentId)}
        onKeyPress={() => onClickThumbsUp(commentId)}
        role="button"
        tabIndex="0"
      >
        {isThumbsUp ? <LikeFilled className="thumb-icon" /> : <LikeOutlined className="thumb-icon" />}
        <span className="comment-action" style={{ color: values.color }}>
          {thumbsUp}
        </span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span
        onClick={() => onClickThumbsDown(commentId)}
        onKeyPress={() => onClickThumbsDown(commentId)}
        role="button"
        tabIndex="0"
      >
        {isThumbsDown ? <DislikeFilled className="thumb-icon" /> : <DislikeOutlined className="thumb-icon" />}
        <span className="comment-action" style={{ color: values.color }}>
          {thumbsDown}
        </span>
      </span>
    </Tooltip>,
  ]

  return (
    <Comment
      className="comment-item"
      actions={actions}
      author={
        <span
          onClick={() => onClickUser(userId)}
          style={{ color: values.color, fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
          onKeyPress={() => onClickUser(userId)}
          role="button"
          tabIndex="0"
        >
          {userName}
        </span>
      }
      // avatar = {avatar && <Avatar size="small" src={avatar} alt="" />}
      avatar={
        avatar ? (
          <Avatar size="small" src={avatar} alt="" />
        ) : (
          <Avatar className="hidden" size="small" src={`/images/male.png`} />
        )
      }
      content={<p style={{ color: values.color, fontSize: '14px' }}>{commentText}</p>}
    />
  )
}



const mapStateToProps = (state) => ({
	comment: state.comment
});

const mapDispatchToProps = {
  likeComment,
  dislikeComment
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);