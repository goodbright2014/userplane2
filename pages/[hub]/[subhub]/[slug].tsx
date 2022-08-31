import { GetStaticProps, GetStaticPaths } from 'next'
import Error from 'next/error'
import { useRouter } from 'next/router'

import { Stack, Card, Box, Heading, Text, Container, Flex } from '@sanity/ui'
import { NavBar, SocialBar, Breadcrumbs, ShopTheStory } from '$components'
import { Category, Article, ArticleSlug } from '../../../types'
import { getClient, urlFor, PortableText, usePreviewSubscription } from '$utils/sanity'
import { handleGroupedItems } from '$utils/helpers'
import { createArticlePageQuery, productQuery }  from '$utils/sanityGroqQueries'

import MuxPlayer from '@mux/mux-video-react';

const assetDocument = {
  "data":{
    "tracks":[
    {
    "type":"video",
    "max_width":1920,
    "max_height":1080,
    "max_frame_rate":30,
    "id":"R004b5R2grQpWq6k6IEsj8pxCbBmDM6RX3kzdbMG6kaY",
    "duration":120
    },
    {
    "type":"audio",
    "max_channels":2,
    "max_channel_layout":"stereo",
    "id":"8DHhJCmhsx4wW009P012tT9id4KMHjVkRtB8gvyaNWdeE",
    "duration":120.023991
    }
    ],
    "status":"ready",
    "playback_ids":[
    {
    "policy":"public",
    "id":"MzAiECuPiZ8k4FHocGDsAzrWRlpKySj1dOud5tYdAHc"
    }
    ],
    "non_standard_input_reasons":{
    "video_bitrate":"high"
    },
    "mp4_support":"none",
    "max_stored_resolution":"HD",
    "max_stored_frame_rate":30,
    "master_access":"none",
    "id":"2lRtVldoqBsGnQ3bN00Qs1CnJC1GhtuhmuF6HRL4RFxY",
    "duration":120.042667,
    "created_at":"1661866133",
    "aspect_ratio":"16:9"
    }
}

export default function ArticlePage({categories, articleData, preview}
  : {categories: Category[], articleData: Article, preview: boolean}) {

  const router = useRouter();

  const {data: article} = usePreviewSubscription(createArticlePageQuery(router.query.slug), {
    params: {slug: router.query.slug},
    initialData: articleData,
    enabled: preview || !!router.query.preview,
  })

  if (!router.isFallback && !article?.slug) {
    return <Error statusCode={404} />;
  } else if (router.isFallback) {
    return <div>Loading...</div>
  }

  const content = handleGroupedItems(
    article.content, "listItem", {_key: "orientation", _value: "vertical"})

  if (!!article.storyProducts) {
    article.storyProducts = article.storyProducts.filter(obj => !!obj.products)
  }
      
  return (
    <>
      <NavBar categories={categories} />
      <Breadcrumbs article={article} />

      <Flex>
        <Box paddingLeft={3} flex={2}>
          <Stack space={2}>
            <SocialBar />
            <Box style={{maxHeight: '800px'}}>
     
              { article.slug === "kcmodular-virtualdesign" ? (
                <MuxPlayer style={{ width: '100%' }} 
                            playbackId={assetDocument.data.playback_ids[0].id} 
                            streamType="on-demand"
                            autoPlay
                            controls
                />
              ):(
                <img src={urlFor(article.image).url() ?? "" } 
                style={{width: "100%", height: "100%", objectFit: "cover"}}/>
              )}
                  
            </Box>
              <Box padding={[1, 3, 4]}>
                <Box paddingY={3}>
                  <Heading size={[2, 3, 4]}>
                    { article.title }
                  </Heading>
                </Box>
                <Text>
                  <PortableText blocks={content} />
                </Text>
              </Box>
            </Stack>
          </Box>
         <Flex align='center' flex={[0, 0, 0, 1]}>
            { (article.storyProducts 
                && !!article.storyProducts[0]) && (
             <Box>
               <ShopTheStory products={article.storyProducts} /> 
            </Box>
           ) }
         </Flex>
        </Flex>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (context) => {

  const articleSlugs = await getClient().fetch(
    `*[_type == "article"]{
      'slug': slug.current,
      'subhub': subsection->slug.current,
      'hub': subsection->category->slug.current
    }`)

  const paths = {paths: articleSlugs.map(
    (slugs: ArticleSlug) => ({params: slugs}))}
    return {
      ...paths,
     fallback: true
   }
}


export const getStaticProps: GetStaticProps = async ({params, preview}) => {

  const query = createArticlePageQuery(params?.slug)
  const article = await getClient(preview).fetch(query)

  return ({
    props: {
      categories: await getClient(preview).fetch(`*[_type == "category"]{name,'slug': slug.current}`),
      articleData: article
    },
    revalidate: 60
  })
}

