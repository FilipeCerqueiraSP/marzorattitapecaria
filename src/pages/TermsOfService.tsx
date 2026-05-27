import Layout from "@/components/Layout";

const TermsOfService = () => {
  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl font-bold text-primary mb-3">
              Termos de Uso
            </h1>
            <div className="stitch-line max-w-xs mx-auto my-4" />
          </div>

          <div className="stitch-border-light p-8 bg-card space-y-8 text-sm text-foreground/90 leading-relaxed">
            <div>
              <h2 className="font-heading text-lg font-semibold text-primary mb-2">
                Aceitação dos Termos
              </h2>
              <p>
                Ao acessar e utilizar o site da Tapeçaria Marzorati, você concorda em cumprir estes Termos de Uso. Caso não concorde com qualquer parte destes termos, solicitamos que não utilize nossos serviços.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-primary mb-2">
                Boa Fé no Uso de Dados
              </h2>
              <p>
                Esperamos que todos os usuários utilizem nosso site de forma ética e em boa fé. As informações e dados disponibilizados devem ser usados exclusivamente para fins legítimos de contato e orçamento. Qualquer tentativa de utilizar os formulários ou canais de comunicação para fins maliciosos, fraudulentos ou prejudiciais à Tapeçaria Marzorati ou a terceiros será considerada violação destes termos.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-primary mb-2">
                Copyright e Propriedade Intelectual
              </h2>
              <p>
                Todo o conteúdo presente neste site — incluindo textos, imagens, logotipos, layout, design e códigos — é de propriedade exclusiva da Tapeçaria Marzorati ou de seus fornecedores, e está protegido pela Lei de Direitos Autorais (Lei nº 9.610/98). É vedada a reprodução, distribuição, modificação ou qualquer outra forma de utilização do conteúdo sem autorização prévia e expressa por escrito.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-primary mb-2">
                Lei Geral de Proteção de Dados (LGPD)
              </h2>
              <p>
                A Tapeçaria Marzorati se compromete a tratar seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Os dados coletados são utilizados de forma transparente, segura e limitada às finalidades informadas em nossa Política de Privacidade. Você possui os direitos de acesso, correção, exclusão, portabilidade e revogação de consentimento, os quais podem ser exercidos mediante contato direto conosco.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-primary mb-2">
                Anti Web Scraping
              </h2>
              <p>
                É expressamente proibida a utilização de qualquer ferramenta, software, script, robô, spider, scraper ou outro meio automatizado para extrair, copiar, indexar ou coletar dados e conteúdos deste site sem autorização prévia por escrito. Violações serão tratadas com as medidas legais cabíveis.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-primary mb-2">
                Limitação de Responsabilidade
              </h2>
              <p>
                A Tapeçaria Marzorati se esforça para manter as informações do site atualizadas e precisas, mas não garante a ausência de erros ou omissões. O uso do site é por conta e risco do usuário.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-primary mb-2">
                Alterações dos Termos
              </h2>
              <p>
                Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. Alterações significativas serão comunicadas no site. O uso continuado do site após modificações constitui aceitação dos novos termos.
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

export default TermsOfService;
