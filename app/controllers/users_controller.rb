class UsersController < ApplicationController
  def check_email
    email = params[:email]
    exists = User.exists?(email: email)
    render json: { exists: exists }
  end

  def check_password
    password_checked = current_user.valid_password?(params[:password])
    render json: { passwordChecked: password_checked }
  end

  def show
    @user = User.find(params[:id])
  end
end