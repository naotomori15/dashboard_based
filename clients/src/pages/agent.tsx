import { useList } from '@pankod/refine-core';
import { Box, Typography } from '@pankod/refine-mui';
import { AgentCards } from 'components';
import BackdropLoader from 'components/common/BackdropLoader';
import CustomErrorComponent from 'components/common/CustomErrorComponent';
import React from 'react';

export default function Agents() {
  const { data, isLoading, isError } = useList({ resource: 'users' });
  const allAgents = data?.data ?? [];
  if (isLoading) return <BackdropLoader isOpen={isLoading} />;

  if (isError) return <CustomErrorComponent />;
  console.log(allAgents);
  return (
    <Box>
      <Typography
        fontSize={25}
        fontWeight={700}
        color='#11142D'>
        Agents List
      </Typography>
      <Box
        mt='20px'
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          backgroundColor: '#fcfcfc',
        }}>
        {allAgents.map((agent) => (
          <AgentCards
            key={agent._id}
            id={agent._id}
            name={agent.name}
            email={agent.email}
            avatar={agent.avatar}
            noOfProperties={agent.allProperties.length}
          />
        ))}
      </Box>
    </Box>
  );
}
