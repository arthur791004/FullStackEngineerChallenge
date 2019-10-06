import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Tab from '@/components/Button/Tab';
import EmployeeList from '@/containers/EmployeeList';
import ReviewList from '@/containers/ReviewList';

const TABS = [
  { name: 'Employees', Content: EmployeeList },
  { name: 'Reviews', Content: ReviewList },
];

const TabList = styled.div`
  margin-bottom: 40px;

  > :first-child {
    padding-left: 0;
  }
`;

const TabContent = styled.div`
  display: ${props => (props.isActive ? 'block' : 'none')};
`;

const Container = styled.div`
  margin: 30px auto;
`;

const AdminPage = () => {
  const [selected, setSelected] = useState(0);
  const selectTab = useCallback(i => () => setSelected(i), [setSelected]);

  return (
    <Container>
      <h1>Admin Panel</h1>
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

export default AdminPage;
