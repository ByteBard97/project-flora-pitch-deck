import sys
from simple_builder import SimpleMathBuilder

def main():
    """Main entry point for math presentation builder"""   
    # Get config file from command line argument, default to config.yaml
    config_file = sys.argv[1] if len(sys.argv) > 1 else "config.yaml"
    
    # Build math presentation using our simple builder
    builder = SimpleMathBuilder(config_file)
    builder.build_all()


if __name__ == "__main__":
    main()