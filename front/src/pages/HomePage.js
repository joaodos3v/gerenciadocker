import Page from 'components/Page';
import Typography from 'components/Typography';
import { NumberWidget } from 'components/Widget';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  MdDone,
  MdDesktopMac
} from 'react-icons/md';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import { getBarData, getLineData } from 'utils/demos';


class HomePage extends React.Component {

  render() {
    return (
      <Page
        className="DashboardPage"
        title="Home"
      >

        <Row>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Falhas Detectadas"
              number="20"
              color="secondary"
              progress={{
                value: 30,
                label: 'Nos últimos 5 monitoramentos',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Redes Criadas"
              number="15"
              color="secondary"
              progress={{
                value: 33,
                label: 'Na última semana',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Distribuições Disponíveis"
              number="4"
              color="secondary"
              progress={{
                value: 50,
                label: 'Adicionadas no último mês',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Monitoramentos Realizados"
              number="50"
              color="secondary"
              progress={{
                value: 75,
                label: 'No último mês',
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Tickets abertos <small className="text-muted"> - média por empresa</small></CardHeader>
              <CardBody>
                <Bar data={getBarData()} />
              </CardBody>
            </Card>
          </Col>
          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Aumento da produtividade  <small className="text-muted"> - porcentagem média por colaborador</small></CardHeader>
              <CardBody>
                <Line
                  data={getLineData()}
                  options={{
                    scales: {
                      xAxes: [
                        {
                          scaleLabel: {
                            display: true,
                            labelString: 'Mês',
                          },
                        },
                      ],
                      yAxes: [
                        {
                          stacked: true,
                          scaleLabel: {
                            display: true,
                            labelString: 'Valor',
                          },
                        },
                      ],
                    },
                  }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader>SOBRE O PROJETO</CardHeader>
              <CardBody>
                <Typography type="h3" className="text-secondary"><MdDesktopMac /> Quem nós somos?</Typography>
                <p>Uma plataforma criada com o intuito de facilitar o uso do conceito de conteinerização. Como, atualmente, a tecnologia mais utilizada para colocar esse conceito em prática é o Docker, essa ferramenta permite que os <i>containers</i> sejam gerenciados de uma forma fácil, através de uma interface simples e intuitiva.</p>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>DEPOIMENTOS</CardHeader>
              <CardBody>
                <div>
                  <em className="text-muted"> "O <mark>GerenciaDocker</mark> orquestrou meus <i>containers</i> e, então, finalmente venci Os Selvagens."</em>
                  <Typography type="h6">
                    <strong> - JON SNOW</strong>
                  </Typography>
                </div>
                <div className="mt-3">
                  <em className="text-muted"> "Após utilizar o <mark>GerenciaDocker</mark>, sou considerado o melhor Hokage da Aldeia da Folha."</em>
                  <Typography type="h6">
                    <strong> - NARUTO</strong>
                  </Typography>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col>
            <Card>
              <CardHeader>BENEFÍCIOS DA PLATAFORMA</CardHeader>
              <CardBody>
                <div>
                  <Typography type="h4" className="text-secondary"><MdDone /> Quais as vantagens da ferramenta?</Typography>
                  <p> Já chega de ter dores de cabeça todas as vezes que um novo desenvolvedor é contratado na equipe e ele precisa configurar o ambiente para dar sequência ao projeto. Já chega de ter problemas ao colocar a  aplicação em produção porque a versão de uma biblioteca estava errada. Já chega de se preocupar com qual <i> framework </i> você tem instalado no seu computador.</p>
                  <p> O conceito de conteinerização chegou para resolver esse problema e permitir que ambientes inteiros e funcionais de uma aplicação ganhem em mobilidade e praticidade, já que com alguns poucos comandos, você consegue exportá-los e importá-los, por exemplo. Mas e se, ao invés de ter que aprender esses comandos, você simplesmente clicasse em um botão?</p>
                  <p> Essa é a ideia do <span className="font-weight-bold">Gerenciadocker</span>, tornar mais fácil o uso dessa ferramenta tão poderosa que é o <i>docker</i>. Com nossa aplicação, você consegue orquestrar todos os seus <i>containers </i> por meio de uma interface minimalista e simples, que fornece todas as opções necessárias para implantar esse tecnologia recente e inovadora na sua empresa!</p>
                </div>        
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Page>
    );
  }
}
export default HomePage;
