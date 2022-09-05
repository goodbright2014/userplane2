import {Button, Card, Box, Stack, Inline, Heading, Flex} from '@sanity/ui'
import { MdShoppingCart } from 'react-icons/md'
import {Category} from '../types'
import Link from 'next/link'
import { useToggleCart } from '../contexts/bigcommerce-context'
import styled from 'styled-components'

const IndexFeatureHeading = styled.div`
  color: #0B999E;
  
  width: 95%;
  font-size: 24px;
  font-weight: normal;
  font-family: 'Righteous', cursive;
  padding-top: 16px;
  padding-left: 8px;
  margin-left: 8px;
  letter-spacing: 8px;

  text-align: start;

  @media (max-width: 768px) {
    color: 0B999E;
    width: 95%;
    font-size: 24px;
    font-weight: normal;
    letter-spacing: 8px;
  }
`

export function NavBar({categories, selectedCategoryName}
    : {categories: Category[], selectedCategoryName?: String}) {

  //TODO: add cartCount
  const toggleCart = useToggleCart()

  const shopButton = (
    <Link href='/shop' key='shop'>
      <Button mode='bleed'  padding={2} text='Shop' />
    </Link>
  )

  const navButtons = [shopButton, ...categories.map((category, i) => (
    //TODO: use MenuButton and Menu to cover subcategories
    <Link href={`/${category.slug }`} key={i}>
      <Button mode="bleed" padding={2} text={category.name} />
    </Link>
  ))]

  return (
      <Card borderBottom  
            paddingTop={4} 
            paddingBottom={1} 
            style={{
              zIndex: '40',
              position:'fixed', 
              right:'0px', 
              left:'0px', 
              width:'full' ,
              opacity:'0.70'}}>
        
        {/*
        <Flex justify='flex-end'>
          <Box paddingRight={[0, 2]}>
            <Button mode='ghost' icon={MdShoppingCart} text="Cart" onClick={() => toggleCart()} />
          </Box>
        </Flex>
            */}     
        <Flex justify='center' >
          <div style={{width: '64px', height: '64px'}}>
            <Link href="/"  >
              <img src='/reduced_logo.png' style={{width: '64px', height: '64px' }} /> 
            </Link>
          </div>
          <div style={{width: '128px', height: '64px'}}>

          <a href="/" style={{textDecoration: 'none'}}>
            <IndexFeatureHeading>
              R3MS
            </IndexFeatureHeading>
            </a>
          </div>
        </Flex>
<br />
        <Stack space={4} >
 
          
          
            {/*<Heading size={[2, 3, 4]}>*/}
            {/*<span style={{fontWeight: 'lighter', color: 'green'}}>DAL-</span>*/}
            {/*<span style={{ color: 'green'}}>Architecture News & Buildings</span>*/}
           
            {/*<IndexFeatureHeading>
              Architecture News& 
            </IndexFeatureHeading>*/}
            {/*</Heading>*/}
            <Inline space={[0,1,4,5]} style={{textAlign: 'center'}}>
              { navButtons }
            </Inline>

        </Stack>

      </Card>
  )
}

