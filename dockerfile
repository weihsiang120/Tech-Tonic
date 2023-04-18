FROM ruby:3.2.1

RUN apt-get update -qq && apt-get install -y postgresql-client
WORKDIR /workapp
COPY Gemfile /workapp/Gemfile
COPY Gemfile.lock /workapp/Gemfile.lock
RUN bundle install

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]