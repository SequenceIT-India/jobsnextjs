import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '../components/Link';
import ProTip from '../components/ProTip';
import Copyright from '../components/Copyright';

const About: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          About Jobhorn
        </Typography>
        <Box maxWidth="md">
          <div id="lipsum">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mollis odio a magna rutrum porttitor. Nulla gravida massa vitae lobortis tincidunt. Pellentesque porttitor ligula sed turpis pulvinar ornare. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed auctor, enim ut cursus molestie, lorem arcu pretium ipsum, quis egestas nisi ante vitae dolor. Maecenas dictum euismod quam nec cursus. Aliquam ultrices, tellus in convallis sollicitudin, quam mauris dictum magna, et fermentum ex ipsum ac nunc. Suspendisse libero orci, tempor sed viverra ut, vulputate sed leo. Quisque ac lacus metus. Vivamus ut posuere metus. Vestibulum laoreet augue magna, nec tristique lorem ullamcorper sit amet. Donec nibh ante, pharetra eget tellus ut, blandit posuere metus.
            </p>
            <p>
              Pellentesque posuere facilisis tortor. Nullam rhoncus rhoncus tristique. Curabitur gravida diam eget arcu luctus tincidunt. Curabitur fermentum dictum augue id tempus. Aliquam erat volutpat. Etiam tincidunt, justo non rutrum varius, dolor libero porta sapien, sed mattis arcu purus vitae arcu. Nam feugiat facilisis libero. Suspendisse quis erat ut augue euismod consequat.
            </p>
            <p>
              Maecenas vitae pulvinar nunc. Curabitur sollicitudin aliquet sodales. In ut quam sit amet ex hendrerit rutrum. Donec eleifend urna id est consequat efficitur. Nulla id lacus eleifend, dictum leo eu, ullamcorper enim. Cras tristique pretium ante ut mollis. Quisque consequat neque vitae libero ornare commodo. Vivamus facilisis, nisl non venenatis auctor, risus tellus dapibus felis, ut tristique mauris sem laoreet nulla.
            </p>
            <p>
              Fusce neque ligula, cursus sit amet orci quis, lobortis commodo dui. Fusce in molestie diam. Phasellus tempor mi in dolor dapibus dictum. Donec faucibus volutpat enim, vel vulputate urna dictum sed. Quisque pellentesque tincidunt consequat. Vestibulum efficitur, turpis pharetra ultrices aliquam, eros nulla scelerisque purus, eu efficitur dui mi id ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
            </p>
            <p>
              Sed a odio ac turpis ultricies venenatis non et magna. Nam et sem massa. Donec sit amet nibh sed felis pulvinar volutpat. Morbi eget felis nec nulla vulputate sodales a at metus. Pellentesque pretium, mauris id consectetur egestas, leo sapien finibus mi, a porttitor metus ante sit amet mauris. Praesent felis metus, pretium eget malesuada eu, sollicitudin sit amet diam. Nunc cursus in urna ut luctus. Nulla quis leo risus. Ut suscipit nunc lacinia mauris tristique tempor. Curabitur finibus non tellus sed semper. Donec sem nisi, consequat quis magna vel, dignissim tristique est. Morbi pretium lobortis malesuada. Praesent imperdiet mauris at tellus volutpat efficitur. Sed dignissim justo ut tortor sagittis, et volutpat risus convallis. Donec mi nisi, viverra at risus et, varius feugiat lorem. Phasellus a neque consequat, aliquet lacus nec, lobortis dui.
            </p>
          </div>
        </Box>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};

export default About;
