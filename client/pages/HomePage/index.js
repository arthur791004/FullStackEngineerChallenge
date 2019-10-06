import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Tab from '@/components/Button/Tab';
import RequiringReviewList from '@/containers/RequiringReviewList';
import FeedbackList from '@/containers/FeedbackList';

const TABS = [
  { name: 'Requiring Reviews', Content: RequiringReviewList },
  { name: 'Feedbacks ', Content: FeedbackList },
];

const TabList = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const TabContent = styled.div`
  display: ${props => (props.isActive ? 'block' : 'none')};
`;

const Container = styled.div`
  margin: 30px auto;
`;

const HomePage = () => {
  const [selected, setSelected] = useState(0);
  const selectTab = useCallback(i => () => setSelected(i), [setSelected]);

  return (
    <Container>
      <TabList>
        {TABS.map(({ name }, i) => (
          <Tab key={name} isActive={selected === i} onClick={selectTab(i)}>
            {name}
          </Tab>
        ))}
      </TabList>
      {TABS.map(({ name, Content }, i) => (
        <TabContent key={name} isActive={selected === i}>
          <Content />
        </TabContent>
      ))}
    </Container>
  );
};

export default HomePage;
