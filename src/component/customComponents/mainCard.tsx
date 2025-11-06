import React, { forwardRef, ReactNode } from 'react';
import { useTheme, SxProps, Theme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  CardActions,
  CardProps,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface MainCardProps extends Omit<CardProps, 'title' | 'content'> {
  border?: boolean;
  boxShadow?: boolean;
  children: ReactNode;
  content?: boolean;
  contentSX?: React.CSSProperties;
  darkTitle?: boolean;
  elevation?: number;
  secondary?: ReactNode;
  shadow?: string;
  mainWrapperClassName?: string;
  sx?: SxProps<Theme>;
  title?: React.ReactNode; 
  hideMainCard?: boolean;
  action?: {
    title: string;
    onClick: () => void;
  };
}


const MainCard = forwardRef<HTMLDivElement, MainCardProps>((props, ref) => {
  const {
    border = true,
    boxShadow = true,
    children,
    content = true,
    contentSX = {},
    darkTitle,
    elevation,
    secondary,
    shadow,
    mainWrapperClassName,
    sx = {},
    action,
    title,
    hideMainCard,
    ...others
  } = props;

  const theme = useTheme();
  const shouldBoxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

  if (hideMainCard) {
    return <>{children}</>;
  }

  return (
    <Card
      elevation={elevation || 0}
      ref={ref}
      {...others}
      className={`${mainWrapperClassName ?? ''} form-main-card`}
      sx={sx}
    >
      <div className="card-header-container">
        {!darkTitle && title && (
          <CardHeader
            className="card-header"
            titleTypographyProps={{ variant: 'subtitle1' }}
            title={title}
            action={secondary}
          />
        )}
        {darkTitle && title && (
          <CardHeader
            className="card-header"
            title={
              <Typography variant="h3" color="secondary">
                {title}
              </Typography>
            }
            action={secondary}
          />
        )}
        {action && (
          <CardActions>
            <Button variant="contained" onClick={action.onClick}>
              <AddIcon />
              {action.title}
            </Button>
          </CardActions>
        )}
      </div>

      {content ? (
        <CardContent className="card-content" style={contentSX}>
          {children}
        </CardContent>
      ) : (
        children
      )}
    </Card>
  );
});

MainCard.displayName = 'MainCard';

export default MainCard;
