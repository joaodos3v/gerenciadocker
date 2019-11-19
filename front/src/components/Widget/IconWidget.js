import React from 'react';
import PropTypes from 'utils/propTypes';

import classNames from 'classnames';

import { Badge, Card, CardBody, CardText, CardTitle, CardSubtitle, Progress } from 'reactstrap';
import Typography from '../Typography';
import { MdCheck, MdClose } from 'react-icons/md';

const IconWidget = ({
  bgColor,
  icon: Icon,
  iconProps,
  name,
  status,
  message,
  progress,
  className,
  ...restProps
}) => {
  
  const classes = classNames('cr-widget', className, {
    [`border-${bgColor}`]: bgColor,
  });

  return (
    <Card inverse className={classes} {...restProps} style={{borderWidth: bgColor === 'danger' ? 'thick' : 'thin'}}>
      <CardBody className="cr-widget__icon">
        <Icon size={50} {...iconProps} />
      </CardBody>
      <CardBody>
        <CardTitle>
          <Typography type="h3" className="d-flex justify-content-between">
            {name}
            {status === 'Funcionando' ? (
              <Badge color="success">
                <MdCheck /> {status}
              </Badge>
            ) : (
              <Badge color="danger">
                <MdClose /> {status}
              </Badge>
            )}
          </Typography>
        </CardTitle>
        <CardSubtitle className="mb-5">
          <Typography type="h5" className="text-muted">{message}</Typography>
        </CardSubtitle>
        {progress && progress.map((p, index) => {
          return (
            <div key={index} className="mb-3">
              <Progress value={p.percentage} color={p.color} style={{ height: '8px' }} />
              <CardText tag="div" className="d-flex justify-content-between">
                <Typography tag="span" className="text-left text-muted small">
                  {p.label}
                </Typography>
                <Typography tag="span" className="text-right text-muted small">
                  {p.value}
                </Typography>
              </CardText>
            </div>
          )
        })}
      </CardBody>
    </Card>
  );
};

IconWidget.propTypes = {
  bgColor: PropTypes.string,
  icon: PropTypes.component,
  iconProps: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

IconWidget.defaultProps = {
  bgColor: 'primary',
  icon: 'span',
  iconProps: { size: 50 },
};

export default IconWidget;
