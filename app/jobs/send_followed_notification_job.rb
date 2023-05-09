class SendFollowedNotificationJob < ApplicationJob
  queue_as :default

  def perform(user, followee)
    FollowedNotification.with(user: user).deliver(followee)
  end
end
