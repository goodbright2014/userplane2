import { Article } from '../types'
import Link from 'next/link'
import { Box, Text } from '@sanity/ui'
import styled from 'styled-components'

const CategoryText = styled.div`
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

export function Breadcrumbs({article}: {article: Article}) {

  return (

      <Box margin={[3, 0, 0, 3]} paddingTop={3} paddingLeft={1}
      
      style={{
          
        position:'relative', 
        top:'200px', 
        
        }}>
        <Text size={4}>
          <CategoryText>
            <Link href={`/${article.category.slug}`}>
              { `${article.category.name} >>` }
            </Link>
            <Link href={`/${article.category.slug}/${article.subsection.slug}`}>
              { ` ${article.subsection.name} >>` }
            </Link>
            <Link href={`/${article.category.slug}/${article.subsection.slug}/${article.slug}`}>
              { ` ${article.title} ` }
            </Link>           
          </CategoryText>

        </Text>
      </Box>

  )
}




