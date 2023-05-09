class NotificationsController < ApplicationController
  def destroy
    if current_user.notifications.find(params[:id]).destroy
      notification = current_user.notifications.newest_first.offset(9).limit(1).first
      if notification.present?
        render json: {
          deleted: true,
          notification: {
            id: notification.id,
            message: notification.to_notification.message,
            url: notification.to_notification.url
          }
          }, status: 200
      else
        render json: { deleted: true, notification: nil }, status: 200
      end
    else
      render json: { deleted: false }, status: 422
    end
  end
end