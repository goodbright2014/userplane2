import Link from 'next/link'
import { Heading, Button } from '@sanity/ui'
import { Feature } from '../types'
import { urlFor } from '$utils/sanity'
import styled from 'styled-components'
import Image from 'next/future/image'


const PaneContainer = styled.div`
  height: 100vw;
  width: 100%;
  background: black;
  overflow: hidden;
  position: relative;
`

const PaneImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 0.65;
`
const DemoImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 1;
  @media (max-width: 768px) {
    Width: 768px;
    height: 100%;
    object-fit: cover;
  }
`

const OverlayHeadingText = styled.div`
  color: white;
  position: absolute;
  top: 10%;
  left: 5%;
  width: 50%;
  font-size: 64px;
  font-weight: bold;
  @media (max-width: 768px) {
    color: white;
    position: absolute;
    top: 10%;
    left: 5%;
    width: 50%;
    font-size: 32px;
    font-weight: bold;
  }
`
const OverlayText = styled.div`
  color: white;
  position: absolute;
  top: 30%;
  left: 5%;
  width: 50%;
  font-size: 22px;
  font-weight: bold;

  @media (max-width: 768px) {
    color: white;
    position: absolute;
    top: 30%;
    left: 5%;
    width: 50%;
    font-size: 16px;
    font-weight: light;
  }
`

export function IndexFeaturePane({feature, headingSize}: {feature: Feature, headingSize: number[]}) {
  let imageUrl: string = "/blank.png"
  if (feature.image && feature.image.asset._ref) {
    imageUrl = urlFor(feature.image).url() as string
  } 

  return (
    <Link href={feature.url}>
      <PaneContainer>
        {/*<DemoImage src={imageUrl} />*/}
       
        <Image src={imageUrl} sizes="100vw" fill  alt=''/>
          
          <OverlayHeadingText>
          Modular Construction 
          </OverlayHeadingText>  

          <OverlayText>
          {/* feature.title */}
          (주)케이씨모듈러
          </OverlayText>
           
        
        
      </PaneContainer>
    </Link>
  )

}
