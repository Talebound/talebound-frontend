import React from 'react';
import LeftNavbar from '../../../components/LeftNavbar/LeftNavbar';
import { Col, Row } from '../../../components/Flex/Flex';
import ContentSection from '../../../components/ContentSection/ContentSection';
import Layout from '../../../components/Layout/Layout';
import ActionBoxWorldList from './ActionBoxWorldList';
import { useGetWorlds } from '../../../api/worlds/useGetWorlds';
import WorldCard from '../../../components/WorldCard/WorldCard';
import LoadingText from '../../../components/Loading/LoadingText';
import InfiniteScrollObserver from '../../../components/InfiniteScrollObserver/InfiniteScrollObserver';

const WorldList: React.FC = () => {
  const {
    data: worldsData,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useGetWorlds({
    variables: {
      public: false,
    },
  });

  return (
    <>
      <ActionBoxWorldList />
      <Layout vertical={true} navbar={<LeftNavbar />}>
        <Row gap="md" alignItems="start" wrap>
          <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
            <Row gap="md" alignItems="start" wrap>
              {worldsData?.pages.map(
                (page) => page.worlds?.map((world) => <WorldCard key={world.id} world={world} />),
              )}
              {hasNextPage && !isFetching && (
                <InfiniteScrollObserver runOnObserve={fetchNextPage} />
              )}
            </Row>
            {isFetching && <LoadingText />}
          </Col>

          <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
            <ContentSection direction="column" header="Worlds">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Lobortis mattis aliquam faucibus purus
                in massa tempor. Aliquam ultrices sagittis orci a scelerisque purus semper eget
                duis. Morbi enim nunc faucibus a pellentesque sit amet. Pulvinar mattis nunc sed
                blandit libero volutpat sed cras ornare. Metus dictum at tempor commodo ullamcorper
                a lacus vestibulum. Egestas erat imperdiet sed euismod nisi porta lorem mollis
                aliquam. Amet tellus cras adipiscing enim. Dis parturient montes nascetur ridiculus
                mus. Faucibus turpis in eu mi bibendum neque egestas. Aliquet eget sit amet tellus
                cras adipiscing enim eu. Sagittis id consectetur purus ut faucibus pulvinar
                elementum integer enim. Lorem ipsum dolor sit amet consectetur adipiscing.
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus consequat enim
                a dignissim. Suspendisse convallis, est tempus euismod laoreet, justo ligula gravida
                ipsum, nec pulvinar leo justo a tellus. Aenean sodales augue non semper viverra.
              </p>

              <p>
                Integer volutpat est libero, vel condimentum eros scelerisque ac. Phasellus sodales
                a est id aliquam. Curabitur nec lobortis erat. Vivamus ullamcorper ipsum ac orci
                varius, in vehicula diam fermentum. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </p>

              <p>
                In venenatis pretium enim, ut aliquet magna. Suspendisse suscipit iaculis vehicula.
                Fusce ac orci ut mauris facilisis sagittis id in urna. Phasellus ut commodo orci.
                Vivamus non nisl est. Mauris lacinia tincidunt mi, eu mollis tortor.
              </p>
            </ContentSection>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default WorldList;
