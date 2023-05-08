class ApplicationController < ActionController::Base
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  before_action :set_notifications, if: :current_user


  def record_not_found
    render file: Rails.public_path.join('404.html'),
           layout: false,
           status: :not_found and return
  end

  def set_notifications
    @notifications = current_user.notifications.newest_first.limit(10)
  end
end
