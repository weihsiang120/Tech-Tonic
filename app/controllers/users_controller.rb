class UsersController < ApplicationController
  def check_email
    email = params[:email]
    valid_email = User.exists?(email: email)
    valid_email = false if current_user && current_user.email == email
    render json: { validEmail: valid_email }
  end

  def check_password
    password_checked = current_user.valid_password?(params[:password])
    render json: { passwordChecked: password_checked }
  end

  def show
    @user = User.find(params[:id])
    if current_user == @user
      redirect_to edit_user_registration_path
    end
    @posts = @user.posts.published.order(created_at: :desc).page(params[:page])
  end

  def follow
    @followee = User.find(params[:id])
    unless current_user.followees.include?(@followee)
      current_user.followees << @followee
      SendFollowedNotificationJob.perform_later(current_user, @followee)
      render json: { followed: true }, status: 200
    else
      current_user.followed_users.find_by(followee_id: @followee.id).destroy
      render json: { followed: false }, status: 200
    end

  end
end