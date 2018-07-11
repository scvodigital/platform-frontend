{{#*inline "insertParam"}}
  {{#if (getProperty @root.request.params.query parameter)}}
    {{#each (arrayify (getProperty @root.request.params.query parameter))}}
      ('fundingscotland-saved-searches', '{{@root.data.auth.email}}', '{{default @root.request.params.query.name "My Search"}}', '{{../parameter}}', '{{this}}'),
    {{/each}}
  {{/if}}
{{/inline}}

INSERT INTO subscriptionParameters (campaign, email, name, parameter, value) VALUES
{{#each (split "keywords,roles,statuses,sectors" ",")}}
  {{>insertParam parameter=this}}
{{/each}}
('fundingscotland-saved-searches', '{{@root.data.auth.email}}', '{{default @root.request.params.query.name "My Search"}}', 'stopper', 'stopper');