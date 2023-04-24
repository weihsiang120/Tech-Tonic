module ApplicationHelper
  def user_email_confirmed?
    current_user && !current_user.confirmed_at.nil?
  end
end
