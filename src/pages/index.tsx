import * as React from "react";
import { graphql } from "gatsby";
import { INode, PageProps } from "@/definitions";
import { Layout, ArticleCard, Container, Hero, Seo } from "@/components";
import cover from "@/images/cover.png";

const Home: React.FC<PageProps> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMdx.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="45. Schulball Akademisches Gymnasium Wien" />
      <Hero
        title="OSCARNACHT"
        date="17. Mai 2024"
        location="Palais Ferstel"
        video
      >
        <p>
          Unser letzter Maturaball fand am 17. Mai 2024 im Palais Ferstel zum Thema "Oscarnacht" statt.<br></br> <br></br>
          Wir freuen uns auf ein zahlreiches Kommen und auf ein Wiedersehen 2025.
        </p>
        
        {/* Reservation Button */}
        {/*
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <a
            href="https://schulball-akg.at/reservation"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#8d271e',
              color: '#fff',
              padding: '10px 20px',
              fontSize: '18px',
              borderRadius: '5px',
              textDecoration: 'none',
            }}
          >
            Karten kaufen
          </a>
        </div>
        */}
        <p>
          <br></br>
          Liebe Ballgäste, <br></br>
          <a href="https://www.picdrop.com/evamanhart/PKjrgDRb9H">hier der Link zu den Ballfotos 2024.</a> <br></br>
          Viel Freude damit! <br></br>
          Herzliche Grüße, <br></br>
          Ihr Schulball-Komitee 2023/24
        </p>
      </Hero>
      <Container>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {posts.map(({ node }: { node: INode }) => {
            const title = node.frontmatter.title || node.fields.slug;
            return (
              <li key={node.fields.slug} className="group">
                <ArticleCard
                  link={node.fields.slug}
                  title={title}
                  description={node.frontmatter.description}
                  tags={node.frontmatter.tags}
                />
              </li>
            );
          })}
        </ol>
      </Container>
    </Layout>
  );
};

export default Home;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { frontmatter: { type: { eq: "article" } } }
      sort: { fields: [frontmatter___order], order: ASC }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            order
            title
            description
            tags
          }
        }
      }
    }
  }
`;
