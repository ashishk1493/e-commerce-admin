import PropTypes from 'prop-types';
import isString from 'lodash/isString';
// @mui
import { Box, Typography, Link } from '@mui/material';
//
import Breadcrumbs from '../Breadcrumbs';

// ----------------------------------------------------------------------

HeaderBreadcrumbs.propTypes = {
  links: PropTypes.array,
  action: PropTypes.node,
  heading: PropTypes.string.isRequired,
  // moreLink: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  sx: PropTypes.object,
};

export default function HeaderBreadcrumbs({ links, action, heading, sx, ...other }) {
  console.log(action, "action---");
  return (
    <Box sx={{ mb: 5, ...sx }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            {heading}
          </Typography>
          <Breadcrumbs links={links} {...other} />
        </Box>

        {action && action.length && action.map((obj, index) => <Box key={index} sx={{ flexShrink: 0, marginRight: "10px" }}>{obj}</Box>)}
        {/* {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>} */}
      </Box>

      {/* <Box sx={{ mt: 2 }}>
        {isString(moreLink) ? (
          <Link href={moreLink} target="_blank" variant="body2">
            {moreLink}
          </Link>
        ) : (
          moreLink.map((href) => (
            <Link noWrap key={"href"} href={href} variant="body2" target="_blank" sx={{ display: 'table' }}>
              {href}
            </Link>
          ))
        )}
      </Box> */}
    </Box >
  );
}
