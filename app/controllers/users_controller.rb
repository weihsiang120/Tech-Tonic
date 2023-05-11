class UsersController < ApplicationController
  before_action :authenticate_user!, except: %i[show]

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
    if params[:keyword].present?
      @posts = @user.posts.published.search(params[:keyword]).order(created_at: :desc).page(params[:page])
      if @posts.empty?
        flash.now[:notice] = "No results found for '#{params[:keyword]}'"
        @posts = @user.posts.order(created_at: :desc).page(params[:page])
      end
    else
      @posts = @user.posts.published.order(created_at: :desc).page(params[:page])
    end
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


  def user_followees
    if current_user.id.to_s == params[:id]
      @followees = current_user.followees
    else
      record_not_found
    end
  end
end
