import React from 'react';
import PropTypes from 'utils/propTypes';

import classNames from 'classnames';

import { Badge, Button, Card, CardBody, CardText, CardTitle, CardSubtitle, Progress } from 'reactstrap';
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
  handleParar,
  handleRemover,
  handleRetomar,
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
        <Button outline color="primary" className="mr-3" onClick={handleParar} disabled={status === 'Parado' ? true : false}>Pausar</Button>
        <Button outline color="secondary" className="mr-3" onClick={handleRetomar} disabled={status === 'Parado' ? false : true}>Retomar</Button>
        <Button outline color="danger" onClick={handleRemover} disabled={status === 'Parado' ? false : true}>Excluir</Button>
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
