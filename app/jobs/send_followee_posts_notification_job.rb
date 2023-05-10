class SendFolloweePostsNotificationJob < ApplicationJob
  queue_as :default

  def perform(author, post)
    author.followers.each do |recipient|
      FolloweePostsNotification.with(user: author, post: post).deliver(recipient)
    end
  end
end
