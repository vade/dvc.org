import React from 'react'
import PropTypes from 'prop-types'

import CommunityButton from '../Button'
import CommunityBlock from '../Block'
import CommunitySection from '../Section'

import data from '../data'

import { Item, Items, Wrapper } from '../styles'

const { description, mobileDescription, title } = data.section.contribute

export default function CommunityContribute({ theme }) {
  return (
    <Wrapper>
      <CommunitySection
        anchor="contribute"
        background="/static/img/community/contribute_bg.jpg"
        color={theme.color}
        description={description}
        icon="/static/img/community/contribute.svg"
        mobileDescription={mobileDescription}
        title={title}
      >
        <Items>
          <Item>
            <CommunityBlock
              title="Make a PR"
              action={
                <CommunityButton theme={theme} href="/">
                  Open Chat
                </CommunityButton>
              }
            >
              Become DVC contributor and let us build something great together.
            </CommunityBlock>
          </Item>
          <Item>
            <CommunityBlock
              title="Write a blogpost"
              action={
                <CommunityButton theme={theme} href="/">
                  Learn More
                </CommunityButton>
              }
            >
              Have something cool on your mind? Suggest a text and we&apos;ll
              publish it in our blog.
            </CommunityBlock>
          </Item>
          <Item>
            <CommunityBlock
              title="Give a talk"
              action={
                <CommunityButton theme={theme} href="/">
                  Learn More
                </CommunityButton>
              }
            >
              We support speakers all over the world and help with preparation,
              speaker training and expenses.
            </CommunityBlock>
          </Item>
          <Item>
            <CommunityBlock
              title="Be an Ambassador"
              action={
                <CommunityButton theme={theme} href="/">
                  Apply
                </CommunityButton>
              }
            >
              Get perks and benefits for significant contributions, creating
              content or hosting meetups.
            </CommunityBlock>
          </Item>
        </Items>
      </CommunitySection>
    </Wrapper>
  )
}

CommunityContribute.propTypes = {
  theme: PropTypes.shape({
    backgroundColor: PropTypes.string,
    color: PropTypes.string
  })
}
