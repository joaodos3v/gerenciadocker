import React from 'react';
import PropTypes from 'utils/propTypes';

import { Card, CardHeader, CardBody, CardText, Badge } from 'reactstrap';

import Avatar from 'components/Avatar';
import Typography from 'components/Typography';

import classNames from 'classnames';

const AnnouncementCard = ({
  color,
  header,
  avatar,
  avatarSize,
  name,
  date,
  text,
  className,
  badgeLinks,
  ...restProps
}) => {
  const bgColor = `bg-${color}`;
  const classes = classNames(bgColor, className);

  return (
    <Card inverse className={classes} {...restProps}>
      {header && typeof header === 'string' ? (
        <CardHeader className={bgColor}>{header}</CardHeader>
      ) : (
        header
      )}
      <CardBody className="d-flex flex-wrap flex-column align-items-center justify-content-center">
        <Avatar size={avatarSize} src={avatar} />
        <CardText className="text-center">
          <Typography type="h4"><strong className="d-block">{name}</strong></Typography>
          <Typography type="h5"><small className="text-muted">{date}</small></Typography>
        </CardText>
        <CardText className="text-center">{text}</CardText>
        <CardText className="text-center">
          {badgeLinks && badgeLinks.map(badgeLink => {
            return (
              <Badge href={badgeLink.href} target="_blank" color={badgeLink.color} className="mr-1">
                {badgeLink.text}
              </Badge>
            )
          })}
        </CardText>

      </CardBody>
    </Card>
  );
};

AnnouncementCard.propTypes = {
  color: PropTypes.string,
  header: PropTypes.node,
  avatar: PropTypes.string,
  avatarSize: PropTypes.number,
  name: PropTypes.string,
  date: PropTypes.date,
  className: PropTypes.string,
  children: PropTypes.element,
};

AnnouncementCard.defaultProps = {
  color: 'gradient-secondary',
  avatarSize: 60,
};

export default AnnouncementCard;
