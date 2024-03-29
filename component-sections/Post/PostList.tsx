import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PAGE_SIZE_POSTS, useGetPosts } from '../../api/posts/useGetPosts';
import PostsTable from './PostsTable';
import { selectPostsByIds } from '../../adapters/PostAdapter';
import { ReduxState } from '../../store';
import { PbPost } from '../../generated/api-types/data-contracts';
import { useSelector } from 'react-redux';

interface PostListProps {
  canEdit?: boolean;
  moduleId?: number;
}

const PostList: React.FC<PostListProps> = ({ canEdit, moduleId }) => {
  const [openedPage, setOpenedPage] = useState(1);

  const {
    data: postsDataPages,
    isFetching: isFetchingPosts,
    fetchNextPage,
    hasNextPage,
  } = useGetPosts({ variables: { moduleId } });

  const postIds = useMemo(
    () => postsDataPages?.pages?.map((page) => page.postIds ?? []).flat() ?? [],
    [postsDataPages],
  );

  const postsData = useSelector(
    (state: ReduxState) => {
      return selectPostsByIds(state, postIds).filter((post): post is PbPost => Boolean(post));
    },
    [postIds],
  );

  useEffect(() => {
    if (
      hasNextPage &&
      postsData.length > 0 &&
      postsData.length <= PAGE_SIZE_POSTS * (openedPage - 1)
    ) {
      fetchNextPage();
    }
  }, [hasNextPage, postsData.length, openedPage, fetchNextPage]);

  const totalPostCount = useMemo(() => {
    return postsDataPages?.pages[0]?.totalCount ?? 0;
  }, [postsDataPages]);

  const onPageChange = useCallback((page: number) => {
    setOpenedPage(page);
  }, []);

  return (
    <PostsTable
      totalCount={totalPostCount}
      loading={isFetchingPosts}
      data={postsData}
      canEdit={canEdit}
      onPageChange={onPageChange}
    />
  );
};

export default PostList;
