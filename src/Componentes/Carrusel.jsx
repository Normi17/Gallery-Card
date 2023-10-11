import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';

const CARDS = 10;
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
  height: 100%;
  padding: 2rem;
  background-color: hsl(280deg, 40%, calc(100% - var(--abs-offset) * 50%));
  border-radius: 1rem;
  color: ${$colorGray};
  text-align: justify;
  transition: all 0.3s ease-out;
  
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
    outline: none; /* Esto elimina el borde cuadrado predeterminado */
  }

  &.left {
    transform: translateX(-100%) translateY(-50%);
  }

  &.right {
    right: 0;
    transform: translateX(100%) translateY(-50%);
  }
`;


const App = () => {
  const [active, setActive] = useState(2);
  const count = CARDS;

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
              <h2>{`Card ${i + 1}`}</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
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

// ReactDOM.render(<App />, document.body);
