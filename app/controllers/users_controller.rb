class UsersController < ApplicationController
  def check_email
    email = params[:email]
    exists = User.exists?(email: email)
    render json: { exists: exists }
  end

  def show
    @user = User.find(params[:id])
  end
end