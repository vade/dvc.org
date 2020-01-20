import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'

import CommunityBlock from '../Block'
import CommunityButton from '../Button'
import CommunitySection from '../Section'

import { pluralizeComments } from '../../utils/i18n'

import {
  Comments,
  Item,
  Items,
  Line,
  Link,
  Meta,
  Placeholder,
  Wrapper
} from '../styles'

import data from '../data'

const { description, mobileDescription, title } = data.section.learn
const { documentation, userContent } = data

function CommunityBlogPost({ url, title, date, color, commentsUrl }) {
  const [count, setCount] = useState()
  const loaded = count !== undefined

  useEffect(() => {
    if (commentsUrl) {
      fetch(`/api/comments?url=${commentsUrl}`)
        .then(result => result.json())
        .then(data => setCount(data.count))
    }
  }, [])

  return (
    <Line key={url}>
      <Link color={color} href={url} target="_blank" rel="noreferrer nofollow">
        {title}
      </Link>
      <Meta>
        {loaded && (
          <>
            <Comments
              href={commentsUrl}
              target="_blank"
              rel="noreferrer nofollow"
            >
              {pluralizeComments(count)}
            </Comments>{' '}
          </>
        )}
        {format(new Date(date), 'MMMM, d')}
      </Meta>
    </Line>
  )
}

CommunityBlogPost.propTypes = {
  color: PropTypes.string,
  commentsUrl: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string
}

export default function CommunityLearn({ posts, theme }) {
  return (
    <Wrapper>
      <CommunitySection
        anchor="learn"
        background="/static/img/community/learn_bg.jpg"
        color={theme.color}
        description={description}
        icon="/static/img/community/learn.svg"
        mobileDescription={mobileDescription}
        title={title}
      >
        <Items>
          <Item>
            <CommunityBlock
              title="Documentation"
              action={
                <CommunityButton theme={theme} href="/">
                  See all docs
                </CommunityButton>
              }
              icon="/static/img/community/documentation.svg"
            >
              {documentation.map(({ url, title, description }) => (
                <Line key={url}>
                  <Link color={theme.color} large href={url}>
                    {title}
                  </Link>
                  <Meta>{description}</Meta>
                </Line>
              ))}
            </CommunityBlock>
          </Item>
          <Item>
            <CommunityBlock
              title="DVC Blog"
              action={
                posts.length && (
                  <CommunityButton theme={theme} href="https://blog.dvc.org">
                    See all Posts
                  </CommunityButton>
                )
              }
              icon="/static/img/community/blog.svg"
            >
              {posts.length ? (
                posts.map(post => (
                  <CommunityBlogPost
                    {...post}
                    key={post.url}
                    color={theme.color}
                  />
                ))
              ) : (
                <Placeholder>Blog is unavailable right now</Placeholder>
              )}
            </CommunityBlock>
          </Item>
          <Item>
            <CommunityBlock
              title="User Content"
              icon="/static/img/community/user_content.svg"
            >
              {userContent.map(({ url, title, author, date }) => (
                <Line key={url}>
                  <Link color={theme.color} href={url}>
                    {title}
                  </Link>
                  <Meta>
                    {author} • {format(date, 'MMMM, d')}
                  </Meta>
                </Line>
              ))}
            </CommunityBlock>
          </Item>
        </Items>
      </CommunitySection>
    </Wrapper>
  )
}

CommunityLearn.propTypes = {
  posts: PropTypes.array,
  theme: PropTypes.shape({
    backgroundColor: PropTypes.string,
    color: PropTypes.string
  })
}