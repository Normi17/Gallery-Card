import React, { useState } from 'react';
import styled from 'styled-components';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';

const CARDS = 10; // Cambia el número de imágenes deseado
const MAX_VISIBILITY = 3;

const $colorPurple = '#8B5CF6';
const $colorPink = '#EC4899';
const $colorGray = '#9CA3AF';
const $colorBlack = '#1F2937';
const $cardSize = '23rem';

const Body = styled.body`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-image: linear-gradient(45deg, ${$colorPurple}, ${$colorPink});
  font-family: 'Montserrat', sans-serif;
`;

const CarouselContainer = styled.div`
  position: relative;
  width: ${$cardSize};
  height: ${$cardSize};
  perspective: 500px;
  transform-style: preserve-3d;
`;

const CardContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: 
    rotateY(calc(var(--offset) * 50deg)) 
    scaleY(calc(1 + var(--abs-offset) * -0.4))
    translateZ(calc(var(--abs-offset) * -30rem))
    translateX(calc(var(--direction) * -5rem));
  filter: blur(calc(var(--abs-offset) * 1rem));
  transition: all 0.3s ease-out;
`;

const Card = styled.div`
  width: 100%;
  height: 73%;
  padding: 2rem;
  background-color: hsl(280deg, 40%, calc(100% - var(--abs-offset) * 50%));
  border-radius: 1rem;
  color: ${$colorGray};
  text-align: justify;
  transition: all 0.3s ease-out;
  position: relative; /* Añadido para el posicionamiento del texto */
  
  h2 {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin: 0 0 0.7em;
    color: ${$colorBlack};
  }
  
  p, h2 {
    transition: all 0.3s ease-out;
    opacity: var(--active);
  }
  
`;

const NavButton = styled.button`
  color: white;
  font-size: 5rem;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  z-index: 2;
  cursor: pointer;
  user-select: none;
  background: unset;
  border: unset;
  
  &:focus {
    outline: none;
  }

  &.left {
    transform: translateX(-100%) translateY(-50%);
  }

  &.right {
    right: 0;
    transform: translateX(100%) translateY(-50%);
  }
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const TextOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  /* background: rgba(29, 179, 196, 0.6); */
  color: #000000;
  padding: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  text-align: center;
`;

const Text = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const App = () => {
  const [active, setActive] = useState(2);
  const count = CARDS;

  // imagenes
  const imageUrls = [
    'https://live.staticflickr.com/8258/8683827826_7345599262_b.jpg',
    'https://t4.ftcdn.net/jpg/02/80/28/33/360_F_280283349_r521kvq1iHUNKns3Gw7F0P0FobFskGXR.jpg',
    'https://as1.ftcdn.net/v2/jpg/01/62/64/38/1000_F_162643875_vGwhGdgJHA79Iz72cCalY2T1nsTGcOsN.jpg'
  ];

  // textos para cada card
  const texts = [
    'Primer texto ',
    'Segundo texto ',
    'Tercer texto ',
    'cuarto texto ',
    'quinto texto ',
    'sexto texto ',
    'septimo texto ',
    'octavo texto ',
    'noveno texto ',
    'decimo texto ',
  ];

  return (
    <Body>
      <CarouselContainer>
        {active > 0 && (
          <NavButton className="nav left" onClick={() => setActive((i) => i - 1)}>
            <TiChevronLeftOutline />
          </NavButton>
        )}
        {[...new Array(count)].map((_, i) => (
          <CardContainer
            style={{
              '--active': i === active ? 1 : 0,
              '--offset': (active - i) / 3,
              '--direction': Math.sign(active - i),
              '--abs-offset': Math.abs(active - i) / 3,
              'pointer-events': active === i ? 'auto' : 'none',
              'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
              'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
            }}
          >
            <Card>
              <Image src={imageUrls[i % imageUrls.length]} alt={`Imagen ${i + 1}`} />
              <TextOverlay
                style={{
                  opacity: i === active ? 1 : 0,
                }}
              >
                <Text>{texts[i]}</Text>
              </TextOverlay>
            </Card>
          </CardContainer>
        ))}
        {active < count - 1 && (
          <NavButton className="nav right" onClick={() => setActive((i) => i + 1)}>
            <TiChevronRightOutline />
          </NavButton>
        )}
      </CarouselContainer>
    </Body>
  );
};

export default App;
