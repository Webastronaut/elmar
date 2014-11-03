##
# + create inline image url() by giving relative path to image src
# based on compass function inline_image(): http://bit.ly/github-compass-inline-image
# ==================================================================
#
module Sass::Script::Functions

    def inline_image(path, mime_type = nil)
        path = path.value
        scss_path = path_to_assets_dev()
        real_path = File.join(scss_path, path)
        inline_image_string(data(real_path), compute_mime_type(path, mime_type))
    end

    protected
        def inline_image_string(data, mime_type)
            data = [data].flatten.pack('m').gsub("\n","")
            url = "url('data:#{mime_type};base64,#{data}')"
            unquoted_string(url)
        end

    private
        def path_to_assets_dev()
            base_path = Dir.pwd
            gruntfile = File.join( base_path, "Gruntfile.js" )
            gruntfile_contents = File.open( gruntfile, "rb" ).read
            gruntfile_global_config = gruntfile_contents.scan( /globalConfig\s*=\s*\{([^}]+)\}/i )
            assets_path = gruntfile_global_config[0][0].scan( /src:\s*['"]([^'"]+)['"]/i )[0][0]
            assets_real_path = File.join( base_path, assets_path, "scss" )
            return assets_real_path
        end

    private
        def compute_mime_type(path, mime_type = nil)
            return mime_type.value if mime_type
            case path
            when /\.png$/i
                'image/png'
            when /\.jpe?g$/i
                'image/jpeg'
            when /\.gif$/i
                'image/gif'
            when /\.svg$/i
                'image/svg+xml'
            when /\.([a-zA-Z]+)$/
                "image/#{Regexp.last_match(1).downcase}"
            else
                print "A mime type could not be determined for #{path}, please specify one explicitly.\n"
            end
        end

        def data(real_path)
            if File.readable?(real_path)
            File.open(real_path, "rb") {|io| io.read}
        else
            print "File not found or cannot be read: #{real_path}\n"
        end
    end

end
# = automagically create css inline images and fonts using base64 */
