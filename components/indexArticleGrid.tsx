import { Grid, Box, Card } from '@sanity/ui'
import { Feature } from '../types'
import { urlFor } from '$utils/sanity'
import { IndexFeaturePane } from '$components'

export function IndexArticleGrid({features}: {features: Feature[]}) {

  return (

    <Grid 
      columns={[1, 1, 1]} 
      rows={[1, 1, 1]} 
      gap={[1, 1, 2, 4]}
      >

      <Box columnStart={1} columnEnd={[1, 1, 3]} rowStart={1} rowEnd={[1,1,3]}>
        <IndexFeaturePane feature={features[0]} headingSize={[2,2,4]} />
      </Box>  


    </Grid> 

  )

}


