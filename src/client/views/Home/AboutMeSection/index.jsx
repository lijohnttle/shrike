import React from 'react';
import { Button, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { SectionContentContainer } from '../SectionContentContainer';
import { useStyles } from './styles';
import { Link } from 'react-router-dom';


const AboutMeSection = ({ screenHeight, isLastSection }) => {
    const classes = useStyles({ screenHeight });

    return (
        <SectionContentContainer
            className={classes.root}
            contentRootClassName={classes.contentRoot}
            canScrollToNextSection={!isLastSection}>
            <div className={classes.split}>
                <div className={classes.leftColumn}>
                    <Typography variant='h1' fontWeight="bold">
                        ABOUT ME
                    </Typography>
                    
                    <div className={classes.summaryContainer}>
                        <Typography variant="h3" fontWeight="bold" paragraph>
                            Hi, I am Ivan Cherkasov!
                        </Typography>

                        <Typography fontSize="1.2rem" paragraph>
                            I am a software engineer, traveller, science lover, Sci-Fi fun.
                        </Typography>
                    </div>

                    <div className={classes.readMoreButton}>
                        <Button variant='contained' component={Link} to="/about" endIcon={<AddIcon />} color="red">
                            <span>READ MORE</span>
                        </Button>
                    </div>
                </div>

                <div className={classes.picture} />
            </div>
        </SectionContentContainer>
    );
};

export {
    AboutMeSection
};
