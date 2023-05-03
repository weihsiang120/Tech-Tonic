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
  end
end