class ApplicationController < ActionController::Base
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found


  def record_not_found
    render file: Rails.public_path.join('404.html'),
           layout: false,
           status: :not_found and return
  end
end
