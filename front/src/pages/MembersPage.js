import Page from 'components/Page';
import { AnnouncementCard } from 'components/Card';
import Typography from 'components/Typography';
import React from 'react';
import {
  Col,
  Row,
} from 'reactstrap';

import joao from 'assets/img/users/joao.jpeg';
import kelwinzao from 'assets/img/users/kelwinzao.jpeg';
import vinao from 'assets/img/users/vinao.jpeg';


class MembersPage extends React.Component {
  render() {

    const members = [
      {
        avatar: joao,
        name: "João Vitor Veronse Vieira",
        class: "Turma 2016/1",
        links: [
          {
            href: "https://github.com/joao-vieira",
            color: "primary",
            text: "GitHub",
          },
          {
            href: "https://twitter.com/VeroneseVitor",
            color: "success",
            text: "Twitter",
          },
          {
            href: "https://www.linkedin.com/in/jo%C3%A3o-vitor-veronese-vieira/",
            color: "info",
            text: "LinkedIn",
          },
        ]
      },
      {
        avatar: kelwinzao,
        name: "Kelwin Komka",
        class: "Turma 2016/1",
        links: [
          {
            href: "https://github.com/KelwinKomka",
            color: "primary",
            text: "GitHub",
          },
          {
            href: "https://twitter.com/ahmok08",
            color: "success",
            text: "Twitter",
          },
          {
            href: "https://www.linkedin.com/in/kelwin-k-08623b101/",
            color: "info",
            text: "LinkedIn",
          },
        ]
      },
      {
        avatar: vinao,
        name: "Vinicius Emanoel Andrade",
        class: "Turma 2016/1",
        links: [
          {
            href: "https://github.com/viniciusandd",
            color: "primary",
            text: "GitHub",
          },
          {
            href: "https://twitter.com/vinauun",
            color: "success",
            text: "Twitter",
          },
          {
            href: "https://www.instagram.com/viniciusandd/",
            color: "info",
            text: "Instagram",
          },
        ]
      }
    ];

    return (
      <Page
        className="DashboardPage"
        title="Membros"
      >

        <Row>
          <Col>
            <Typography type="lead">
              Estes são os acadêmicos do curso de Ciência da Computação, da URI Erechim, que construíram esse projeto.
            </Typography>
          </Col>
        </Row>

        <Row>
          {members.map(member => {
            return (
              <Col lg="4" md="12" sm="12" xs="12">
                <AnnouncementCard
                  color="dark"
                  header="DESENVOLVEDOR"
                  avatarSize={150}
                  avatar={member.avatar}
                  name={member.name}
                  date={member.class}
                  badgeLinks={member.links}
                  style={{ height: 500 }}
                />
              </Col>
            )
          })}
        </Row>

      </Page>
    );
  }
}
export default MembersPage;
