"use client";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import SectionLoader from "@/components/loaders/SectionLoader";
import { PostItem } from "@/helpers/types";
import EmptySection from "@/snippets/EmptySection";
import TopBar from "@/components/TopBar";
import Link from "next/link";
import PlusIcon from "@/components/icons/PlusIcon";
import { hasClaim } from "@/lib/utils";

const PostCards = () => {
  const { selectedTeam, setToaster, organization } = useApp();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PostItem[] | null>(null);
  const getPosts = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(`/Posts?teamId=${selectedTeam?.id}&skip=0`);
      //console.log(res);
      if (res && res?.succeeded) {
        const { data } = res;
        setPosts(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleRefetch = async () => {
    await getPosts();
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      <TopBar title="Post">
        {hasClaim(organization?.claims, "Permission.Posts.Create") ? (
          <Link
            href={"/communication/posts/create"}
            className="btn btn--tertiary"
          >
            <PlusIcon />
            <span>Add New Post</span>
          </Link>
        ) : <></>}
      </TopBar>
      {loading ? (
        <SectionLoader />
      ) : (
        <div className="px-2 py-8 flex flex-col gap-5">
          {posts && posts?.length > 0 ? (
            posts.map((post, index: number) => {
              return (
                <PostCard
                  key={index}
                  post={post}
                  handleRefetch={handleRefetch}
                />
              );
            })
          ) : (
            <EmptySection
              title="No Post Found"
              content={`Add your first post to ${selectedTeam?.name} team.`}
              btnTitle="Add New Post"
              link={`/communication/posts/create`}
            />
          )}
        </div>
      )}
    </>
  );
};

export default PostCards;
