import Layout from "@/components/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl font-bold text-primary mb-3">
              Política de Privacidade
            </h1>
            <div className="stitch-line max-w-xs mx-auto my-4" />
          </div>

          <div className="stitch-border-light p-8 bg-card space-y-8 text-sm text-foreground/90 leading-relaxed">
            <div>
              <h2 className="font-heading text-lg font-semibold text-primary mb-2">
                Coleta de Dados
              </h2>
              <p>
                Ao utilizar o formulário de contato em nosso site, coletamos os seguintes dados pessoais: nome, e-mail e telefone. Essas informações são fornecidas voluntariamente pelo usuário e são utilizadas exclusivamente para fins de comunicação e possível recontato no futuro.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-primary mb-2">
                Uso das APIs de E-mail
              </h2>
              <p>
                Os dados coletados são processados por APIs de e-mail responsáveis pelo envio e armazenamento das mensagens. Essas APIs têm acesso ao nome, e-mail e telefone informados exclusivamente para viabilizar o serviço de comunicação entre a Tapeçaria Marzorati e o usuário.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-primary mb-2">
                Proteção e Confidencialidade
              </h2>
              <p>
                <strong className="text-foreground">Seus dados não serão utilizados por terceiros em hipótese alguma.</strong> A Tapeçaria Marzorati não vende, aluga, cede ou compartilha suas informações pessoais com qualquer empresa ou organização externa para fins comerciais ou de marketing.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-primary mb-2">
                Não Publicação
              </h2>
              <p>
                <strong className="text-foreground">Os dados fornecidos não serão publicados.</strong> Nenhuma informação pessoal enviada por meio do formulário de contato será divulgada publicamente em nosso site ou em qualquer outro canal.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-primary mb-2">
                Finalidade do Uso
              </h2>
              <p>
                Os dados são utilizados única e exclusivamente para que possamos responder às mensagens recebidas e realizar recontato futuro caso necessário, sempre no contexto de nossos serviços de tapeçaria e estofados.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-primary mb-2">
                Armazenamento
              </h2>
              <p>
                As informações são mantidas em ambientes seguros e acessíveis apenas por pessoal autorizado da Tapeçaria Marzorati, respeitando os princípios de segurança da informação.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-primary mb-2">
                Seus Direitos
              </h2>
              <p>
                Você pode, a qualquer momento, solicitar a exclusão, correção ou acesso aos seus dados pessoais armazenados. Para isso, entre em contato conosco pelo e-mail ou WhatsApp disponíveis na página de contato.
              </p>
            </div>

            <div className="pt-4 border-t border-dashed border-border">
              <p className="text-xs text-muted-foreground text-center">
                Última atualização: Maio de 2026.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
