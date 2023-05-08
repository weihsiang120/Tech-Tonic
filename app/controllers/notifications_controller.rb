class NotificationsController < ApplicationController
  def destroy
    Notification.find(params[:id]).destroy
    render json: { deleted: true }, status: 200
  end
end