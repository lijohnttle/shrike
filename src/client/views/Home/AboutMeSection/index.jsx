import React from 'react';
import { SectionContentWrapper } from '../SectionContentWrapper';
import { SectionWrapper } from '../SectionWrapper';
import colors from '../../../themes/colors';
import { Box } from '@mui/system';
import { Summary } from './Summary';
import { SectionTitle } from './SectionTitle';
import { Picture } from './Picture';
import { ContactList } from './ContactList';
import { LeftContent } from './LeftContent';
import { RightContent } from './RightContent';


const AboutMeSection = ({ contacts, screenHeight, showScrollToNextSection }) => {
    return (
        <SectionWrapper
            screenHeight={screenHeight}
            styles={{
                background: '#191919',
                color: colors.textComplementary,
                borderTop: `8px solid ${colors.brand}`,
                borderBottom: `8px solid ${colors.brand}`,
            }}
            canScrollToNextSection={showScrollToNextSection}
            scrollButtonDarkStyle>

            <SectionContentWrapper>
                <Box
                    display="flex"
                    flexWrap="nowrap"
                    justifyContent="space-between"
                    alignItems="start"
                    sx={{
                        flexDirection: {
                            xs: 'column',
                            md: 'row',
                        }    
                    }}>

                    <LeftContent>
                        <SectionTitle />

                        <Summary />
                    </LeftContent>

                    <RightContent>
                        <Picture />

                        <ContactList contacts={contacts} />
                    </RightContent>
                </Box>
            </SectionContentWrapper>
        </SectionWrapper>
    );
};

export {
    AboutMeSection
};
