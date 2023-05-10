class SendTagPostsNotificationJob < ApplicationJob
  queue_as :default

  def perform(post)
    post.tags.each do |tag|
      users = tag.users
      TagPostsNotification.with(tag: tag).deliver(users)
    end
  end
end
