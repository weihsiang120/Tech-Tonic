module ApplicationHelper
  def user_email_confirmed?
    current_user && !current_user.confirmed_at.nil?
  end

  def tag_color
    color = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
    random_color = color.sample 
  end
end
